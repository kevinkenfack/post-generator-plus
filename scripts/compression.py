from PIL import Image
import os

# Dossier source et de sortie
input_dir = '.'
output_dir = 'output'

# Créer le dossier de sortie s'il n'existe pas
os.makedirs(output_dir, exist_ok=True)

# Extensions valides
extensions = ('.png', '.jpeg', '.jpg', '.webp', '.gif', '.bmp', '.tiff')

# Traitement des fichiers
for filename in os.listdir(input_dir):
    if not filename.lower().endswith(extensions):
        continue

    input_path = os.path.join(input_dir, filename)

    # Nom de fichier sans extension
    base_name = os.path.splitext(filename)[0]
    output_path = os.path.join(output_dir, base_name + '.jpg')

    try:
        with Image.open(input_path) as img:
            rgb_image = img.convert('RGB')  # conversion au format compatible JPG
            rgb_image.save(output_path, format='JPEG', quality=70, optimize=True)
            print(f'Converti et compressé : {filename} -> {output_path}')
    except Exception as e:
        print(f"Erreur avec {filename} : {e}")