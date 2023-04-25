interface ISectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
}

export default function SectionSkeleton({
  title,
  children,
  className,
}: ISectionProps) {
  return (
    <section
      className={`center flex flex-col gap-[6rem] lg:gap-[4rem] md:gap-[2.4rem] relative ${className}`}
    >
      <h2 className="text-[3.6rem] font-bold text-white">{title}</h2>
      {children}
    </section>
  );
}
