import stripe
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.api.auth import get_current_user
from backend.app.models.user import User
from backend.app.models.payment import Payment, PaymentStatus
from backend.app.schemas.payment import CheckoutSessionRequest, PaymentOut
from backend.app.core.config import settings

router = APIRouter()

stripe.api_key = settings.STRIPE_API_KEY

@router.post("/create-checkout-session")
async def create_checkout_session(
    input_data: CheckoutSessionRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Creates a Stripe Checkout Session for a specific product.
    If Stripe Key is missing, creates a mock success payment (for dev).
    """
    # Define prices (in prod this should come from DB or Config)
    # 1500.00 BRL
    PRICES = {
        "viability_report": 150000, 
    }
    
    amount = PRICES.get(input_data.product_type)
    if not amount:
        # Default price if not found or special handling
        amount = 150000 

    # MOCK MODE if no Stripe Key or dummy key
    if not settings.STRIPE_API_KEY or "dev" in settings.STRIPE_API_KEY or len(settings.STRIPE_API_KEY) < 10:
         # Create a database record immediately for testing
        import uuid
        mock_id = str(uuid.uuid4())
        
        new_payment = Payment(
            user_id=current_user.id,
            stripe_session_id="mock_session_" + mock_id,
            amount=amount/100.0,
            currency="BRL",
            status=PaymentStatus.COMPLETED, # Auto complete in dev
            product_name=input_data.product_type
        )
        db.add(new_payment)
        db.commit()
        db.refresh(new_payment)
        
        # In a real app, this would be a URL to Stripe. 
        # Here we return a URL that the frontend redirects to, simulating success.
        return {"checkout_url": f"{settings.FRONTEND_URL}/dashboard?payment_success=true&mock_id={new_payment.id}"}

    try:
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    'price_data': {
                        'currency': 'brl',
                        'product_data': {
                            'name': 'Relatório de Viabilidade (Algor)',
                        },
                        'unit_amount': amount,
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=f'{settings.FRONTEND_URL}/dashboard?payment_success=true&session_id={{CHECKOUT_SESSION_ID}}',
            cancel_url=f'{settings.FRONTEND_URL}/dashboard?payment_canceled=true',
            customer_email=current_user.email,
            metadata={
                "user_id": current_user.id,
                "product_type": input_data.product_type
            }
        )
        return {"checkout_url": checkout_session.url}
    except Exception as e:
        print(f"Stripe Error: {e}")
        raise HTTPException(status_code=500, detail="Error creating payment session")

@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.body()
    sig_header = request.headers.get('stripe-signature')
    
    if not settings.STRIPE_WEBHOOK_SECRET:
         return {"status": "ignored", "reason": "no_webhook_secret"}

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError as e:
        raise HTTPException(status_code=400, detail="Invalid signature")

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        
        user_id = session['metadata'].get('user_id')
        product_type = session['metadata'].get('product_type')
        
        if user_id:
             new_payment = Payment(
                user_id=int(user_id),
                stripe_session_id=session['id'],
                amount=session['amount_total'] / 100.0,
                currency=session['currency'],
                status=PaymentStatus.COMPLETED,
                product_name=product_type or "unknown"
            )
             db.add(new_payment)
             db.commit()

    return {"status": "success"}

@router.get("/my-purchases", response_model=list[PaymentOut])
async def get_my_purchases(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Payment).filter(Payment.user_id == current_user.id).all()

@router.get("/report/download")
async def download_report(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Gera e baixa o Relatório de Viabilidade SE o pagamento foi confirmado.
    """
    from fastapi.responses import Response
    from backend.app.services.report_generator import ReportGenerator
    from backend.app.models.assessment import Assessment

    # 1. Verificar Pagamento
    payment = db.query(Payment).filter(
        Payment.user_id == current_user.id,
        Payment.product_name == "viability_report",
        Payment.status == PaymentStatus.COMPLETED
    ).first()

    if not payment:
        raise HTTPException(status_code=403, detail="Pagamento não encontrado ou pendente. Adquira o relatório para desbloquear.")

    # 2. Buscar Dados Reais da Avaliação (Opcional: pegar a mais recente)
    last_assessment = db.query(Assessment).filter(Assessment.owner_id == current_user.id).order_by(Assessment.created_at.desc()).first()
    
    assessment_data = {}
    if last_assessment:
        assessment_data = {
            "total_score": last_assessment.score_total
        }

    # 3. Gerar PDF
    generator = ReportGenerator(user_name=current_user.full_name or "Cliente Algor", assessment_data=assessment_data)
    pdf_content = generator.generate()

    # 4. Retornar Arquivo
    return Response(
        content=pdf_content,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=Algor_Viability_Report_{current_user.id}.pdf"
        }
    )

