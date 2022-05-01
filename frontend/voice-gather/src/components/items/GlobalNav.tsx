import { Link } from "../elements/link/Link";
import { ListItem } from "../elements/listItem/ListItem"
import styled from 'styled-components';

const StyledListContainer = styled.ul`
display: flex;
justify-content: space-arround;
padding:0;
margin: auto 0;
`

const navItemStyle = {
    width: 'auto',
    height: 'auto',
}

const navItemList = [
    {
        name: '募集',
        link: '#'
    },
    {
        name: '管理',
        link: '#'
    },
    {
        name: 'お問い合わせ',
        link: '#'
    }
]

export const GlobalNav = () => {

    return (
        <StyledListContainer>
            {navItemList.map((item) => {
                return (
                    <div style={{margin:"0 1em"}}>
                        <ListItem>
                            <Link linkStyle={navItemStyle}>
                                {item.name}
                            </Link>
                        </ListItem>
                    </div>
                )})}
        </StyledListContainer>
    )
}