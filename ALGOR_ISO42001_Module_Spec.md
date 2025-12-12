TECHNICAL SPECIFICATION: ISO/IEC 42001:2024 LMS MODULETarget System: ALGOR Platform (React/Firebase)Agent Context: Feature Implementation & Specialized UI ConstructionDesign System: Google Material 3 (Expressive)1. Module Architecture OverviewThis module ("Formação Advisor/Auditor AI-MS") functions as a specialized Learning Management System (LMS) within the ALGOR platform. It requires a specific layout structure distinct from the main marketing site, focusing on content consumption (video/pdf) and progress tracking.1.1 Core Functional RequirementsRole-Based Views: Dynamic UI adaptation for "Advisor" (Implementation focus) vs. "Auditor" (Verification focus).Dual Content Engine:Video: YouTube IFrame API (Custom Controls, Private/Unlisted support).Documents: Secure PDF Viewer (Firebase Storage + Tokenized Access + Canvas Rendering).Progress Tracking: Granular tracking per module/lesson (Video % watched, Document opened).2. Data Structure (Firebase Firestore)The agent must enforce the following schema to support the hierarchical nature of ISO standards (Clause -> Requirement -> Evidence).2.1 Collection: coursesTypeScriptinterface Course {
  id: string; // e.g., "iso42001_lead_auditor"
  title: string;
  type: 'certification' | 'workshop';
  totalModules: number;
  // Hierarchical Structure
  modules: {
    id: string; // e.g., "clause_6_planning"
    title: string; // "Clause 6: Planning"
    order: number;
    lessons: {
      id: string; // e.g., "6.1_risk_actions"
      title: string;
      type: 'video' | 'document' | 'quiz';
      videoId?: string; // YouTube ID (Unlisted)
      documentRef?: string; // Firebase Storage Path
      durationMin: number;
    };
  };
}
2.2 Collection: users/{uid}/enrollmentsTypeScriptinterface Enrollment {
  courseId: string;
  role: 'advisor' | 'auditor'; // Determines UI layout
  startedAt: Timestamp;
  progress: {
    [lessonId: string]: {
      status: 'completed' | 'in_progress' | 'locked';
      timestamp: number; // Video seek position
      completedAt?: Timestamp;
    };
  };
  certificationStatus: 'pending' | 'issued';
}
3. UI/UX Specifications (Material 3 Expressive)3.1 Layout Strategy: "The Classroom Pattern"The agent must implement a List-Detail Canonical Layout:Navigation Rail (Left): High-level course navigation (Modules/Clauses).Component: NavigationRail (MUI).Master Pane (Middle - Collapsible): List of lessons within the selected module.Component: Drawer (Persistent) or custom Side Panel.Style: Use Surface Container Low background.Detail Pane (Right - Main): The content player (Video or PDF).Style: Surface (White/Dark Grey) with BorderRadius: 28px (Top-Left corner only).3.2 The Video Player (Custom YouTube Wrapper)Constraint: Do NOT use the default YouTube embed UI. It breaks immersion.Requirement: Use react-youtube or raw IFrame API.Controls: Overlay custom Material 3 controls (Play/Pause FAB, Linear Progress Bar) on top of the video frame.State:Video End: Auto-trigger "Mark as Complete" in Firestore.Live Stream: If videoType === 'live', hide seek bar and show "LIVE" badge (Red ErrorContainer).3.3 The Secure Document ViewerSecurity Requirement: PDF files must NOT be directly downloadable via simple URL hacking.Implementation:Fetch blob from Firebase Storage using Auth Token.Render pages using react-pdf onto an HTML5 <canvas>.Disable right-click context menu on the canvas.Watermark: Overlay current user's email/UID semi-transparently over the canvas to discourage screen capture.4. Component Implementation Guide4.1 "Audit Checklist" Component (Auditor Mode)For the Auditor track, the interface must allow interactive verification.UI Pattern: ExpansionPanel list.Interaction: Inside each panel, include Switch controls for "Conformity / Non-Conformity".Input: TextField (Outlined) for "Evidence Notes".4.2 "Resource Drive" Component (Advisor Mode)For the Advisor track, focus on file templates.UI Pattern: Grid of Cards (Google Drive style).Card Anatomy:Icon: File Type (DOCX/XLSX) - Use Material Symbols.Image: Thumbnail preview.Action: "Download Template" IconButton.5. Agent Task List (Step-by-Step)Phase 1: Foundation[ ] Create src/modules/lms/.[ ] Define Firestore interfaces in TypeScript (types/lms.ts).[ ] Implement useCourseProgress hook (Real-time Firestore listener).Phase 2: Video Engine4.  [ ] Build VideoPlayerWrapper.tsx.5.  [ ] Integrate YouTube IFrame API.6.  [ ] Create Custom Controls overlay using MUI Slider and Fab.Phase 3: Document Engine7.  [ ] Build SecurePdfViewer.tsx using react-pdf.8.  [ ] Implement canvas rendering logic with watermark overlay.Phase 4: "Expressive" Polish9.  [ ] Add Framer Motion transitions between lessons (Slide X axis).10. [ ] Implement "Confetti" animation on Module Completion.