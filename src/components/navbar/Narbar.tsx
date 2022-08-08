import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';




const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Navbar = ({updateLoginUser}: any) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>

        <Left>
        <Logo onClick={() => {navigate('/')}}>Revature Swag Shop</Logo>
        </Left> {SearchBar()}
        <Right>
          {!updateLoginUser && 
            <MenuItem onClick={() => {navigate('/register')}}>REGISTER</MenuItem>
          }
          {!updateLoginUser && 
            <MenuItem onClick={() => {navigate('/login')}}>SIGN IN</MenuItem>
          }
          {updateLoginUser &&
            <MenuItem onClick={() => {navigate('/profile')}}>PROFILE</MenuItem>
          }
          {updateLoginUser &&
            <MenuItem onClick={() => {window.location.href="/"}}>LOG OUT</MenuItem>
          }
          <MenuItem onClick={() => {navigate('/cart')}}> 
            <Badge color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export function SearchBar() {
  const navigate = useNavigate();
  let [keywords, setKeywords] = useState("");
 
  return (
    <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Products" onChange={(e)=>setKeywords(e.target.value)} inputProps={{ 'aria-label': 'search products' }} onKeyPress={(e) => {
            if (e.key === "Enter") {
              navigate('/search?keyword=' + keywords);
            }
          }}/>
      <IconButton sx={{ p: '10px' }} aria-label="search" onClick={() => {navigate('/search?keyword=' + keywords)}}>
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    </Paper>
  );
}

export default Navbar;