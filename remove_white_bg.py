from PIL import Image
import os
import glob

source_dir = r"C:\Users\edisi\.gemini\antigravity\brain\423e2828-bb68-452e-b1ae-6eb72a18f612"
target_dir = r"c:\Users\edisi\.gemini\antigravity\playground\chrono-aldrin\frontend\public"

# Map of which new file replaces which old file logic:
# Actually we can just process them and save them to the target dir with the same filenames as before? 
# Or better, let's use the new filenames but clean them up.

pattern = "*_alpha_*.png"
files = glob.glob(os.path.join(source_dir, pattern))

for file_path in files:
    filename = os.path.basename(file_path)
    print(f"Processing {filename}...")
    
    img = Image.open(file_path)
    img = img.convert("RGBA")
    
    datas = img.getdata()
    new_data = []
    
    # Threshold for white removal
    threshold = 240
    
    for item in datas:
        # If pixel is very light/white, make it transparent
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    
    # Save to public dir
    target_path = os.path.join(target_dir, filename)
    img.save(target_path, "PNG")
    print(f"Saved transparent image to {target_path}")
