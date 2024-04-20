import Image from "next/image";

export default function HeroSection(){
    return (
      <section class="relative mb-6 h-80 flex justify-center items-center">
        <div
          class="absolute w-full h-full overflow-hidden"
          style={{ opacity: 0.5 }}
        >
          <Image
            src="/hero-image.jpeg"
            className="rounded-lg"
            quality={100}
            fill
            sizes="100vw"
            alt="hero-image"
            style={{
              objectFit: "cover",
            }}  
            priority
          />
        </div>
        <div class="z-10 text-center px-8 drop-shadow-lg shadow-black">
          <div class="uppercase text-sm mb-4">Welcome to</div>
          <div class="text-4xl font-mplus font-medium">
            Weekend Code&apos;s
            <span className="text-yellow-500"> Chronicles</span>
          </div>
        </div>
      </section>
    );
}