import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UpdateProduct from "../components/modify-products/UpdateProduct";

const mockedUsedNavigate = jest.fn();

// Mock useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
 }));

 beforeEach(() => {
    mockedUsedNavigate.mockReset();
  });

describe("Test the Update Product Page", ()=>{
    test('Laoding Product... text is displayed, when no product', ()=>{
        render(<UpdateProduct/>);
        const linkElement = screen.getByText(/Loading Product.../i);
        expect(linkElement).toBeInTheDocument();
    })

})