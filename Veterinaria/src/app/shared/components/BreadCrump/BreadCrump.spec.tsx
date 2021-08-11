import * as React from 'react';
import BreadCrump, {RutasBreadCrump} from "./index";
import {fireEvent, wait, prettyDOM, render, RenderResult} from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';

describe('Miga de pan de cada pagina test', () => {

    it('you must disable the back button if the current value is one ',  () => {

        let routes:Array<RutasBreadCrump> = [
            { nombre: "", path: "/", icon: "fas fa-home" },
            { nombre: "Productos", path: "/productos", icon: "" }
        ]
        let component:RenderResult = render(
            <Router >
                <BreadCrump
                    nombrePage={"Test de prueba"}
                    rutas={routes}
                />
            </Router>
        )
        expect(component.container).toHaveTextContent('Test de prueba')
        expect(component.container).toHaveTextContent('Productos')
    });
})