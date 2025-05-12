#!/bin/bash

# Compteur initial
n=10

# Parcours de tous les fichiers image dans le dossier actuel
for file in *.jpg *.jpeg *.png *.gif; do
  # Vérifie si le fichier existe pour éviter les erreurs si aucun fichier ne correspond
  [ -e "$file" ] || continue

  # Extraction de l'extension du fichier
  ext="${file##*.}"

  # Nouveau nom de fichier
  new_name="background$n.$ext"

  # Renommage du fichier
  mv -- "$file" "$new_name"

  # Incrémentation du compteur
  ((n++))
done