"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Slider } from "@/components/ui/slider"

// Définir des arrière-plans de couleurs
const COLOR_BACKGROUNDS = [
  { id: "color1", name: "Bleu", color1: "#3b82f6", color2: "#1e40af" },
  { id: "color2", name: "Vert", color1: "#10b981", color2: "#065f46" },
  { id: "color3", name: "Violet", color1: "#8b5cf6", color2: "#5b21b6" },
  { id: "color4", name: "Rose", color1: "#ec4899", color2: "#9d174d" },
  { id: "color5", name: "Orange", color1: "#f59e0b", color2: "#b45309" },
  { id: "color6", name: "Rouge", color1: "#ef4444", color2: "#991b1b" },
  // Nouvelles couleurs stylées
  { id: "color7", name: "Menthe", color1: "#00bc7d", color2: "#007a55" },
  { id: "color8", name: "Émeraude", color1: "#007a55", color2: "#022c22" },
  { id: "color9", name: "Gris Foncé", color1: "#71717b", color2: "#09090b" },
  { id: "color10", name: "Dark Mode", color1: "#09090b", color2: "#000000" },
  { id: "color11", name: "Menthe Foncée", color1: "#00bc7d", color2: "#022c22" },
  { id: "color12", name: "Gris Vert", color1: "#71717b", color2: "#007a55" },
  { id: "color13", name: "Noir", color1: "#000000", color2: "#000000" },
  { id: "color14", name: "Blanc", color1: "#ffffff", color2: "#ffffff" },
  { id: "color15", name: "Jaune", color1: "#fbbf24", color2: "#92400e" },
  { id: "color16", name: "Cyan", color1: "#06b6d4", color2: "#0e7490" },
  { id: "color17", name: "Indigo", color1: "#4f46e5", color2: "#3730a3" },
  { id: "color18", name: "Fuchsia", color1: "#d946ef", color2: "#a21caf" },
  { id: "color19", name: "Lime", color1: "#84cc16", color2: "#4d7c0f" },
  { id: "color20", name: "Amber", color1: "#fbbf24", color2: "#92400e" },
  { id: "color21", name: "Teal", color1: "#14b8a6", color2: "#0f766e" },
  { id: "color22", name: "Rose", color1: "#ec4899", color2: "#9d174d" },
  { id: "color23", name:  "Slate", color1: "#64748b", color2: "#334155" },
  { id: "color24", name: "Zinc", color1: "#3f3f46", color2: "#18181b" },
  { id: "color25", name: "Neutral", color1: "#a1a1aa", color2: "#111827" },
  { id: "color26", name: "Stone", color1: "#78716c", color2: "#3f3f46" },
  { id: "color27", name: "Gray", color1: "#d1d5db", color2: "#374151" },
  { id: "color28", name: "Cool Gray", color1: "#d1d5db", color2: "#4b5563" },
  { id: "color29", name: "True Gray", color1: "#d1d5db", color2: "#6b7280" },
  { id: "color30", name: "Warm Gray", color1: "#d1d5db", color2: "#9ca3af" },
  { id: "color31", name: "Sky", color1: "#0ea5e9", color2: "#0284c7" },
  { id: "color32", name: "Violet", color1: "#8b5cf6", color2: "#5b21b6" },
  { id: "color33", name: "Fuchsia", color1: "#d946ef", color2: "#a21caf" },
  { id: "color34", name: "Indigo", color1: "#4f46e5", color2: "#3730a3" },
  { id: "color35", name: "Cyan", color1: "#06b6d4", color2: "#0e7490" },
  { id: "color36", name: "Rose", color1: "#ec4899", color2: "#9d174d" },
  { id: "color37", name: "Sky", color1: "#0ea5e9", color2: "#0284c7" },
  { id: "color38", name: "Violet", color1: "#8b5cf6", color2: "#5b21b6" },
  { id: "color39", name: "Fuchsia", color1: "#d946ef", color2: "#a21caf" },
  { id: "color40", name: "Indigo", color1: "#4f46e5", color2: "#3730a3" },
  { id: "color41", name: "Cyan", color1: "#06b6d4", color2: "#0e7490" },
  { id: "color42", name: "Rose", color1: "#ec4899", color2: "#9d174d" },
  { id: "color43", name: "Sky", color1: "#0ea5e9", color2: "#0284c7" },
  { id: "color44", name: "Violet", color1: "#8b5cf6", color2: "#5b21b6" },
  { id: "color45", name: "Fuchsia", color1: "#d946ef", color2: "#a21caf" },
  { id: "color46", name: "Indigo", color1: "#4f46e5", color2: "#3730a3" },
  { id: "color47", name: "Cyan", color1: "#06b6d4", color2: "#0e7490" },
  { id: "color48", name: "Rose", color1: "#ec4899", color2: "#9d174d" },
  { id: "color49", name: "Sky", color1: "#0ea5e9", color2: "#0284c7" },
  { id: "color50", name: "Violet", color1: "#8b5cf6", color2: "#5b21b6" },
  { id: "color51", name: "Fuchsia", color1: "#d946ef", color2: "#a21caf" },
  { id: "color52", name: "Indigo", color1: "#4f46e5", color2: "#3730a3" },
  { id: "color53", name: "Cyan", color1: "#06b6d4", color2: "#0e7490" },
  { id: "color54", name: "Rose", color1: "#ec4899", color2: "#9d174d" },
  { id: "color55", name: "Sky", color1: "#0ea5e9", color2: "#0284c7" },
  { id: "color56", name: "Violet", color1: "#8b5cf6", color2: "#5b21b6" },
  { id: "color57", name: "Fuchsia", color1: "#d946ef", color2: "#a21caf" },
  { id: "color58", name: "Indigo", color1: "#4f46e5", color2: "#3730a3" },
  { id: "color59", name: "Cyan", color1: "#06b6d4", color2: "#0e7490" },
  { id: "color60", name: "Rose", color1: "#ec4899", color2: "#9d174d" },

]

// Définir les URLs des images depuis le répertoire public
const IMAGE_URLS = {
  img1: "/background1.webp",
  img2: "/background2.webp",
  img3: "/background3.jpg",
  img4: "/background4.jpg",
  img5: "/background5.png",
  img6: "/background6.jpg",
  img7: "/background7.jpg",
  img8: "/background8.jpg",
  img9: "/background9.svg",
  img10: "/background10.jpg",
  img11: "/background11.jpg",
  img12: "/background12.jpg",
  img13: "/background13.jpg",
  img14: "/background14.jpg",
  img15: "/background15.jpg",
  img16: "/background16.jpg",
  img17: "/background17.jpg",
  img18: "/background18.jpg",
  img19: "/background19.jpg",
  img20: "/background20.jpg",
  img21: "/background21.jpg",
  img22: "/background22.jpg",
  img23: "/background23.jpg",
  img24: "/background24.jpg",
  img25: "/background25.jpg",
  img26: "/background26.jpg",
  img27: "/background27.jpg",
  img28: "/background28.jpg",
  img29: "/background29.jpg",
  img30: "/background30.jpg",
  img31: "/background31.jpg",
  img32: "/background32.jpg",
  img33: "/background33.jpg",
  img34: "/background34.jpg",
  img35: "/background35.jpg",
  img36: "/background36.jpg",
  img37: "/background37.jpg",
  img38: "/background38.jpg",
  img39: "/background39.jpg",
  img40: "/background40.jpg",
  img41: "/background41.jpg",
  img42: "/background42.jpg",
  img43: "/background43.jpg",
  img44: "/background44.jpg",
  img45: "/background45.jpg",
  img46: "/background46.jpg",
  img47: "/background47.jpg",
  img48: "/background48.jpg",
  img49: "/background49.jpg",
  // Si vous ajoutez d'autres images dans le dossier public, ajoutez-les ici
}

// Couleurs de fallback pour les images non disponibles
const FALLBACK_COLORS = [
  { from: "orange-500", to: "orange-800" },
  { from: "violet-500", to: "violet-800" },
  { from: "pink-500", to: "pink-800" },
  { from: "red-500", to: "red-800" },
  { from: "blue-500", to: "blue-800" },
  { from: "green-500", to: "green-800" },
  { from: "yellow-500", to: "yellow-800" },
  { from: "indigo-500", to: "indigo-800" },
  { from: "purple-500", to: "purple-800" },
  { from: "teal-500", to: "teal-800" },
  { from: "cyan-500", to: "cyan-800" },
  { from: "lime-500", to: "lime-800" },
  { from: "emerald-500", to: "emerald-800" },
  { from: "amber-500", to: "amber-800" },
  { from: "rose-500", to: "rose-800" },
  { from: "slate-500", to: "slate-800" },
  { from: "zinc-500", to: "zinc-800" },
  { from: "neutral-500", to: "neutral-800" },
  { from: "stone-500", to: "stone-800" },
  { from: "gray-500", to: "gray-800" },
  { from: "cool-gray-500", to: "cool-gray-800" },
  { from: "true-gray-500", to: "true-gray-800" },
  { from: "warm-gray-500", to: "warm-gray-800" },
  { from: "light-blue-500", to: "light-blue-800" },
  { from: "light-green-500", to: "light-green-800" },
  { from: "light-red-500", to: "light-red-800" },
  { from: "light-yellow-500", to: "light-yellow-800" },
  { from: "light-purple-500", to: "light-purple-800" },
  { from: "light-pink-500", to: "light-pink-800" },
  { from: "light-orange-500", to: "light-orange-800" },
  { from: "light-teal-500", to: "light-teal-800" },
  { from: "light-cyan-500", to: "light-cyan-800" },
  { from: "light-lime-500", to: "light-lime-800" },
  { from: "light-emerald-500", to: "light-emerald-800" },
  { from: "light-slate-500", to: "light-slate-800" },
  { from: "light-zinc-500", to: "light-zinc-800" },
  { from: "light-neutral-500", to: "light-neutral-800" },
  { from: "light-stone-500", to: "light-stone-800" },
  { from: "light-gray-500", to: "light-gray-800" },
  { from: "light-cool-gray-500", to: "light-cool-gray-800" },
  { from: "light-true-gray-500", to: "light-true-gray-800" },
  { from: "light-warm-gray-500", to: "light-warm-gray-800" },
  { from: "light-sky-500", to: "light-sky-800" },
  { from: "light-violet-500", to: "light-violet-800" },
  { from: "light-fuchsia-500", to: "light-fuchsia-800" },
  { from: "light-indigo-500", to: "light-indigo-800" },
  { from: "light-cyan-500", to: "light-cyan-800" },
  { from: "light-rose-500", to: "light-rose-800" },
  { from: "light-sky-500", to: "light-sky-800" },
  { from: "light-violet-500", to: "light-violet-800" },
  { from: "light-fuchsia-500", to: "light-fuchsia-800" },
  { from: "light-indigo-500", to: "light-indigo-800" },
  { from: "light-cyan-500", to: "light-cyan-800" },
  { from: "light-rose-500", to: "light-rose-800" },
]

export default function ImageGenerator() {
  const [text, setText] = useState("")
  const [background, setBackground] = useState("color1")
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Commencer avec loading à true
  const [isGenerating, setIsGenerating] = useState(false)
  const [fontSize, setFontSize] = useState(60) // Taille de police par défaut
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageLoadStatus, setImageLoadStatus] = useState<{ [key: string]: boolean }>({})
  const [activeTab, setActiveTab] = useState("couleurs")
  const { toast } = useToast()

  // Initialiser l'état de chargement des images et forcer le passage à l'interface principale
  useEffect(() => {
    // Initialiser tous les statuts d'image à true par défaut
    const initialStatus: { [key: string]: boolean } = {}
    Object.keys(IMAGE_URLS).forEach((key) => {
      initialStatus[key] = true
    })
    setImageLoadStatus(initialStatus)

    // Forcer le passage à l'interface principale après un court délai
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Attendre 1 seconde pour donner l'impression de chargement

    return () => clearTimeout(timer)
  }, [])

  const generateImage = () => {
    if (!canvasRef.current) return

    setIsGenerating(true)
    toast({
      title: "Génération en cours",
      description: "Votre image est en cours de création...",
    })

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      setIsGenerating(false)
      toast({
        title: "Erreur",
        description: "Impossible de créer l'image. Veuillez réessayer.",
        variant: "destructive",
      })
      return
    }

    // Show loading state
    setGeneratedImage(null)

    // Set standard canvas size for all backgrounds
    canvas.width = 1616
    canvas.height = 1034

    // Handle different background types
    if (background.startsWith("color")) {
      // Find the selected color background
      const colorBg = COLOR_BACKGROUNDS.find((c) => c.id === background) || COLOR_BACKGROUNDS[0]

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, colorBg.color1)
      gradient.addColorStop(1, colorBg.color2)
      ctx.fillStyle = gradient

      // Fill the background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add some decorative elements
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      for (let i = 0; i < 10; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 100 + 50
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Add text on the image
      addTextToCanvas(ctx, canvas.width, canvas.height)

      // Convert canvas to data URL
      setGeneratedImage(canvas.toDataURL("image/png"))
      setIsGenerating(false)
      toast({
        title: "Image générée",
        description: "Votre image a été créée avec succès !",
      })
    } else {
      // Draw image background
      const imgKey = background // img1, img2, etc.
      const img = new Image()
      img.crossOrigin = "anonymous" // Important pour CORS

      img.onload = () => {
        // Draw the image to fill the canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        // Add a semi-transparent overlay for better text visibility
        // ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
        // ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Add text on the image
        addTextToCanvas(ctx, canvas.width, canvas.height)

        // Convert canvas to data URL
        setGeneratedImage(canvas.toDataURL("image/png"))
        setIsGenerating(false)
        toast({
          title: "Image générée",
          description: "Votre image a été créée avec succès !",
        })
      }

      img.onerror = () => {
        console.error(`Erreur de chargement de l'image: ${IMAGE_URLS[imgKey as keyof typeof IMAGE_URLS]}`)

        // Use a fallback color
        const index = Number.parseInt(imgKey.replace("img", "")) - 1
        const colorBg = COLOR_BACKGROUNDS[index % COLOR_BACKGROUNDS.length]

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, colorBg.color1)
        gradient.addColorStop(1, colorBg.color2)
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        addTextToCanvas(ctx, canvas.width, canvas.height)
        setGeneratedImage(canvas.toDataURL("image/png"))
        setIsGenerating(false)

        toast({
          title: "Utilisation d'un arrière-plan de secours",
          description: "L'image n'a pas pu être chargée. Un arrière-plan de couleur a été utilisé.",
          variant: "destructive",
        })
      }

      // Ajouter un paramètre de cache-busting pour éviter les problèmes de cache
      const cacheBuster = `?cache=${new Date().getTime()}`
      img.src = IMAGE_URLS[imgKey as keyof typeof IMAGE_URLS] + cacheBuster
    }
  }

  const addTextToCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Configure text style
    ctx.fillStyle = "white"
    ctx.strokeStyle = "black"
    ctx.lineWidth = 0 // Suppression de la bordure noire
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Utiliser la taille de police définie par l'utilisateur
    ctx.font = `bold ${fontSize}px Arial`

    // Split text into words
    const words = text.split(" ")
    const lineHeight = fontSize * 1.2
    const maxWidth = width * 0.8 // Use 80% of canvas width

    const lines = []
    let currentLine = words[0] || ""

    // Create lines of text
    for (let i = 1; i < words.length; i++) {
      const testLine = currentLine + " " + words[i]
      const metrics = ctx.measureText(testLine)

      if (metrics.width > maxWidth) {
        lines.push(currentLine)
        currentLine = words[i]
      } else {
        currentLine = testLine
      }
    }

    if (currentLine) {
      lines.push(currentLine) // Add the last line
    }

    // Calculate starting Y position to center the text block
    const totalTextHeight = lines.length * lineHeight
    let y = height / 2 - totalTextHeight / 2 + lineHeight / 2

    // Draw each line
    lines.forEach((line) => {
      // Draw text without stroke
      ctx.fillText(line, width / 2, y)
      y += lineHeight
    })
  }

  const downloadImage = () => {
    if (!generatedImage) return

    toast({
      title: "Téléchargement",
      description: "Téléchargement de votre image...",
    })

    const link = document.createElement("a")
    link.href = generatedImage
    link.download = `post-image-${new Date().getTime()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Téléchargement terminé",
      description: "Votre image a été téléchargée avec succès !",
    })
  }

  // Générer dynamiquement les éléments d'image
  const renderImageOptions = () => {
    return Object.keys(IMAGE_URLS).map((imgKey, index) => {
      const imgNumber = imgKey.replace("img", "")
      const fallbackColorIndex = index % FALLBACK_COLORS.length
      const fallbackColor = FALLBACK_COLORS[fallbackColorIndex]

      return (
        <div key={imgKey} className="flex flex-col items-center gap-2">
          <div className="border rounded-md overflow-hidden w-full aspect-video relative">
            <div className="w-full h-full bg-gray-200">
              <img
                src={IMAGE_URLS[imgKey as keyof typeof IMAGE_URLS] || "/placeholder.svg"}
                alt={`Arrière-plan ${imgNumber}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // En cas d'erreur, remplacer par un dégradé
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                  target.parentElement!.style.background = `linear-gradient(to bottom right, #${fallbackColor.from.replace("from-", "")}, #${fallbackColor.to.replace("to-", "")})`
                }}
              />
            </div>
            <RadioGroupItem value={imgKey} id={imgKey} className="absolute top-2 right-2" />
          </div>
          <Label htmlFor={imgKey}>Image {imgNumber}</Label>
        </div>
      )
    })
  }

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Générateur d&apos;Images pour Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-center text-muted-foreground">Chargement des ressources...</p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="text">Votre texte</Label>
                <Input
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Entrez votre texte ici"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="font-size">Taille de la police</Label>
                  <span className="text-sm text-muted-foreground">{fontSize}px</span>
                </div>
                <Slider
                  id="font-size"
                  min={20}
                  max={120}
                  step={1}
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Petite</span>
                  <span>Moyenne</span>
                  <span>Grande</span>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="couleurs">Couleurs</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                </TabsList>

                <TabsContent value="couleurs" className="mt-4">
                  <div className="space-y-2">
                    <Label>Choisissez une couleur d&apos;arrière-plan</Label>
                    <RadioGroup value={background} onValueChange={setBackground} className="grid grid-cols-3 gap-4">
                      {COLOR_BACKGROUNDS.map((colorBg) => (
                        <div key={colorBg.id} className="flex flex-col items-center gap-2">
                          <div className="border rounded-md overflow-hidden w-full aspect-video relative">
                            <div
                              className="w-full h-full"
                              style={{
                                background: `linear-gradient(to bottom right, ${colorBg.color1}, ${colorBg.color2})`,
                              }}
                            ></div>
                            <RadioGroupItem value={colorBg.id} id={colorBg.id} className="absolute top-2 right-2" />
                          </div>
                          <Label htmlFor={colorBg.id}>{colorBg.name}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </TabsContent>

                <TabsContent value="images" className="mt-4">
                  <div className="space-y-2">
                    <Label>Choisissez une image d&apos;arrière-plan</Label>
                    <RadioGroup value={background} onValueChange={setBackground} className="grid grid-cols-2 gap-4">
                      {renderImageOptions()}
                    </RadioGroup>
                  </div>
                </TabsContent>
              </Tabs>

              <Button onClick={generateImage} className="w-full" disabled={!text.trim() || isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Génération en cours...
                  </>
                ) : (
                  "Générer l'image"
                )}
              </Button>

              {generatedImage && (
                <div className="space-y-4">
                  <div className="border rounded-md overflow-hidden">
                    <img src={generatedImage || "/placeholder.svg"} alt="Image générée" className="w-full" />
                  </div>

                  <Button onClick={downloadImage} className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger l&apos;image
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Hidden canvas for image generation */}
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </CardContent>
      </Card>

      {/* Ajout du composant Toaster pour afficher les notifications */}
      <Toaster />
    </div>
  )
}
