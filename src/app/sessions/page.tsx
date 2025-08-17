import { Suspense } from "react";
import SessionsContent from "./SessionsContent";

export default function Sessions() {
  return (
    <Suspense fallback={<div>Loading sessions...</div>}>
      <SessionsContent />
    </Suspense>
  );
}
