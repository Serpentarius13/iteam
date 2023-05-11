import dynamic from "next/dynamic";

const FinishForm = dynamic(() => import("@/components/Forms/FinishForm"));

export default function FinishRegistration() {
  return (
    <main className="w-screen h-screen overflow-x-hidden flex items-center justify-center ">
      <section className="flex flex-col items-center gap-[2rem]">
        <h2 className="form-title">Finish registration</h2>
        <FinishForm />
      </section>
    </main>
  );
}
