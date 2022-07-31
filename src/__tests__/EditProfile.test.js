import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditProfile from "../components/profile/EditProfile";

const mockedUsedNavigate = jest.fn();

// Mock useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockedUsedNavigate,
 }));

 beforeEach(() => {
    mockedUsedNavigate.mockReset();
  });


describe("Test the Profile Page" , () => {

    test('Edit Profile text is displayed', () => {
        render(
            <EditProfile loginUser={true} updateLoginUser={true}/>
            );
        const linkElement = screen.getByText(/Edit Profile/i);
        expect(linkElement).toBeInTheDocument();
      });

    test('Edit Profile contains three buttons(Edit, Cancel, Delete)', async () => {
        render(
            <EditProfile loginUser={true} updateLoginUser={true}/>
            );
        const buttonList = await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(3);
    }); 

    test('FirstName field accepts user input', async () => {
        render(
            <EditProfile loginUser={true} updateLoginUser={true}/>
            );
        const firstName = await screen.findByPlaceholderText("First Name");
        userEvent.type(firstName, "Test");
        expect(firstName.value).toMatch("Test");
    });

    test('LastName field accepts user input', async () => {
        render(
            <EditProfile loginUser={true} updateLoginUser={true}/>
            );
        const lastName = await screen.findByPlaceholderText("Last Name");
        userEvent.type(lastName, "Test");
        expect(lastName.value).toMatch("Test");
    });

    test('Email field accepts user input', async () => {
        render(
            <EditProfile loginUser={true} updateLoginUser={true}/>
            );
        const email = await screen.findByPlaceholderText("Email");
        userEvent.type(email, "Test@gmail.com");
        expect(email.value).toMatch("Test@gmail.com");
    });

    test('Password field should have type password', async () => {
        render(
            <EditProfile loginUser={true} updateLoginUser={true}/>
            );
        const password = await screen.findByPlaceholderText("Password");
        expect(password).toHaveAttribute("type", "password");
    });

    test('User should be able to Edit their profile', async () => {
        render(
            <EditProfile loginUser={true} updateLoginUser={true}/>
            );

        const editBtn = await screen.findAllByRole("button");

        const firstName = await screen.findByPlaceholderText("First Name");
        const lastName = await screen.findByPlaceholderText("Last Name");
        const email = await screen.findByPlaceholderText("Email");
        const password = await screen.findByPlaceholderText("Password");

        userEvent.type(firstName, "Test");
        userEvent.type(lastName, "Test");
        userEvent.type(email, "Test@gmail.com");
        userEvent.type(password, "123");

        userEvent.click(editBtn[0]);

        // Need to simulate API Logout eventually as this should read Register and not Edit Profile.
        await waitFor(() => {
            expect(screen.getByText(/Edit Profile/i)).toBeInTheDocument();
        });
    });

})
