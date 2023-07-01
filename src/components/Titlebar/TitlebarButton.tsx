import { cn } from "../../lib/utils";

export default function TitlebarButton({
  className,
  ...props
}: JSX.IntrinsicElements["button"]) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex h-10 w-10 justify-center items-center transition-colors hover:bg-accent hover:text-accent-foreground",
        className
      )}
    />
  );
}
