// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import { Navigation } from "./components/navigation";

export default function Root() {
  return (
    <Html lang="fr">
      <Head>
        <Title>SolidStart - With TailwindCSS</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <div class="grid grid-cols-[256px_1fr]">
              {/* Flex pour fixer le bouton en bas */}
              <aside class="bg-sky-700 w-full h-screen flex flex-col">
                <h1>LOGO</h1>
                <Navigation />

                <button class="shadow-xl mb-2 mx-2 text-slate-300">Se déconnecter</button>
                {/*  */}
              </aside>

              <Routes>
                <FileRoutes />
              </Routes>
            </div>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
