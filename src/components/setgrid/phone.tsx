import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

/**
 * A screenshot inside a phone frame: titanium rail, bezel, dynamic island and
 * home indicator. Everything is sized in percentages of the frame width, so one
 * component works at any size.
 */
export default function SetgridPhone({ src, alt, priority, className }: Props) {
  return (
    <div className={`sg-device ${className ?? ""}`}>
      <span className="sg-device-key sg-device-silent" />
      <span className="sg-device-key sg-device-volup" />
      <span className="sg-device-key sg-device-voldown" />
      <span className="sg-device-key sg-device-power" />
      <div className="sg-device-screen">
        <div className="sg-device-status">
          <span className="sg-device-island" />
        </div>
        <Image
          src={src}
          alt={alt}
          width={800}
          height={1422}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="block h-auto w-full"
        />
        <div className="sg-device-bottom">
          <span className="sg-device-bar" />
        </div>
      </div>
    </div>
  );
}
