import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import CreateProduct from "../components/create-product/CreateProduct";

const mockedUsedNavigate = jest.fn();

// Mock useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
 }));

 beforeEach(() => {
    mockedUsedNavigate.mockReset();
  });

  describe("Test the create Products Page", ()=>{

    test("Create Product text is displayed on the screeen", ()=>{
        render(<CreateProduct/>);
        const linkElement = screen.getByText(/Create Product/i);
        expect(linkElement).toBeInTheDocument();
    })

    test('Create Product should have two buttons', async () => {
      render(<CreateProduct/>);
      const buttonList = await screen.findAllByRole("button");
      expect(buttonList).toHaveLength(2);
  }); 

  test('Product Name Text should have user input', async () => {
      
      await act(async ()=>{render(<CreateProduct/>)
      const prodName = await document.getElementById("pName");
      userEvent.type(prodName, "Test");
      expect(prodName.value).toMatch("Test");
    })
  });

  /*

  test('Product Image Text should have user input', async () => {
    render(<CreateProduct/>);
    const prodName =await document.getElementById("pImage");
    userEvent.type(prodName, "Test");
    expect(prodName.value).toMatch("Test");
  });

  test('Product Description Text should have user input', async () => {
    render(<CreateProduct/>);
    const prodName =await document.getElementById("pDescription");
    userEvent.type(prodName, "Test");
    expect(prodName.value).toMatch("Test");
});

test('Product Quantity Text should have user input', async () => {
  render(<CreateProduct/>);
  const prodName =await document.getElementById("pQuantity");
  userEvent.type(prodName, "10");
  expect(prodName.value).toMatch("10");
});

test('Product Price Text should have user input', async () => {
  render(<CreateProduct/>);
  const prodName =await document.getElementById("pPrice");
  userEvent.type(prodName, "10");
  expect(prodName.value).toMatch("10");
});
*/

  })