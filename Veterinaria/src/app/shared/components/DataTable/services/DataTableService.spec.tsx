import * as React from 'react';
import DataTablePagination from "./index";
import {fireEvent, wait, prettyDOM, render, RenderResult} from "@testing-library/react";
import mockAxios from "axios";

describe('Paginador de la tabla testing', () => {

    jest.mock('axios')

    axios.get.mockImplementationOnce
})