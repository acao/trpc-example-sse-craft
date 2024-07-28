import { Suspense } from "react";
import { Chat } from "./chat";
import { Landing } from "./landing";

export default async function Home(
  props: Readonly<{ params: { channelId: string } }>
) {
  const channelId = props.params.channelId;

  return (
    <Suspense
      fallback={
        <div className="flex h-full flex-1 flex-row items-center justify-center italic">
          Loading....
        </div>
      }
    >
      <main className="flex flex-1 overflow-hidden h-full flex-row">
       
        <Chat channelId={channelId} />
        <Landing channelId={channelId} />
      </main>
    </Suspense>
  );
}
