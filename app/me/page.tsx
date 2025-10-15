import { MasonryGallery } from "@/components/masonry-gallery";

const photos = [
  {
    id: 1,
    src: "/photos/IMG_0369.JPG",
    alt: "Fashion portrait with red fabric",
    aspectRatio: 1.5,
    caption: "Locals in the Ngari region of Tibet are pushing a bicycle, which is actually a shared bike from the city.",
  },
  {
    id: 2,
    src: "/photos/IMG_6246.JPG",
    alt: "Elegant woman in golden silk",
    aspectRatio: 1.5,
    caption: "This is a rice field in Dali, Yunnan, which is a gathering place for digital nomads in China.",
  },
  {
    id: 3,
    src: "/photos/IMG_9646.JPG",
    alt: "Abstract geometric blue cube",
    aspectRatio: 1,
    caption: "At the foothills of the Himalayas, I’m currently driving to the highest point I’ve reached so far.",
  },
]

export default function AboutPage() {
    return (
      <div className="min-h-screen">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-light mb-8 text-balance">About</h1>
  
          <p className="text-muted-foreground leading-relaxed mb-12">
            Hi, I'm Kevin Wu, an independent developer based in Shanghai, China. I created this simple page to help you get to know me a bit better. Here you can find some of my photos
            from China, a short video introducing myself, and projects I've been working on.
          </p>
  
          <section className="mb-10">
            <h2 className="text-2xl font-light mb-4">What I Enjoy</h2>
            <p className="text-muted-foreground leading-relaxed">
              I love photography and road trips — meet locals and explore new places on the road
              brings me joy and inspiration.
            </p>
            <div className="mt-4">
              <MasonryGallery photos={photos} />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-light mb-4">My Projects</h2>
            <p className="text-muted-foreground leading-relaxed">
              I enjoy building creative tools that help people express ideas visually.
              I've currently worked on <a href="https://twittershots.com/" target="_blank" className="text-blue-500 dark:text-blue-200  hover:underline hover:text-blue-600 underline-offset-4">TwitterShots</a>, a tool that helps people turn tweets into shareable content.
            </p>
          </section>
        </div>
      </div>
    )
  }
  