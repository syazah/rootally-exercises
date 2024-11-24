import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Program = lazy(() => import("./pages/Program"));
const Category = lazy(() => import("./pages/Category"));
function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/program/:id"} element={<Program />} />
          <Route path={"/category/:id"} element={<Category />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
