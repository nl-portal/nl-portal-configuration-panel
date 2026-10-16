/*
 * Copyright 2025 Ritense BV, the Netherlands.
 *
 * Licensed under EUPL, Version 1.2 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ComponentProps, lazy, Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import type { Editor } from "@monaco-editor/react";

const MonacoEditor = lazy(() => import("./monacoEditor.ts"));

/** Monaco, served from the bundle and loaded on first use. */
const CodeEditor = (props: ComponentProps<typeof Editor>) => (
  <Suspense fallback={<Skeleton height={props.height ?? 100} />}>
    <MonacoEditor {...props} />
  </Suspense>
);

export default CodeEditor;
