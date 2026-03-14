interface StepHeadingProps {
  step: string;
  title: string;
}

export default function StepHeading({ step, title }: StepHeadingProps) {
  return (
    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
      <span className="text-[#FF8C32]">{step}</span>
      <span className="text-gray-900"> {title}</span>
    </h2>
  );
}
