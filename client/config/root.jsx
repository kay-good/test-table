import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Root = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div>React router6</div>} />
                <Route path="/test" element={<div>Test</div>} />
                <Route path="*" element={<h3>404</h3>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Root