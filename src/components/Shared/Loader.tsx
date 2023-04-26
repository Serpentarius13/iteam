interface ILoaderProps {
  isGreen?: boolean;
}

export default function Loader({ isGreen = false }: ILoaderProps) {
  return <div className={`lds-dual-ring ${isGreen && "green-loader"}`} />;
}
