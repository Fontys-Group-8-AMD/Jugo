import requests
import json
from pathlib import Path

# Test image path
img_path = Path('images_data/compliant/10.png')

if img_path.exists():
    print("✓ Test image found")
    
    # Send to API
    with open(img_path, 'rb') as f:
        files = {'file': ('image.png', f, 'image/png')}
        try:
            response = requests.post('http://127.0.0.1:8000/predict', files=files, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                print(f"✓ API Response received")
                print(f"  - Status: {data['label_name']}")
                print(f"  - Score: {data['score']}%")
                print(f"  - Rules count: {len(data['rules'])}")
                print(f"\n  Rules breakdown:")
                for rule in data['rules']:
                    print(f"    ✓ {rule['rule']} ({rule['label']})")
                    print(f"      Status: {rule['status']}")
                    print(f"      Confidence: {rule['confidence']*100:.1f}%")
                    print(f"      Probability: {rule['probability_compliant']:.2f} compliant")
                    print()
            else:
                print(f"✗ API Error: {response.status_code}")
                print(response.text)
        except Exception as e:
            print(f"✗ Connection Error: {e}")
else:
    print(f"✗ Test image not found at {img_path}")
