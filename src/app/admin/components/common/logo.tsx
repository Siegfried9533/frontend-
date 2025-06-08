import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-35 max-w-[15rem]">
      <Image
        src="/images/logo/logo_RGBunny.svg"
        alt="RGBunny logo"
        width={150}
        height={35}
        className="dark:hidden w-full h-full object-contain"
        priority
      />

      <Image
        src="/images/logo/logo_RGBunny.svg"
        alt="RGBunny logo"
        width={150}
        height={35}
        className="hidden dark:block w-full h-full object-contain"
        priority
      />
    </div>
  );
}
