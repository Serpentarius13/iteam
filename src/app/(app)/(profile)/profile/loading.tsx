import Loader from "@/components/Shared/Load/Loader";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {" "}
      <Loader />
    </div>
  );
}
