import styled from 'styled-components';

const StyledSpan = styled.span`
display: block;
position: relative;
width: 16px
height: 16px;
&:hover{
    cursor: pointer;
}
&::before, &::after{
    cursor: pointer;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1px; 
    height: 16px; 
    background: #666;
}
&::before{
    transform: translate(-50%,-50%) rotate(45deg);
}
&::after{
    transform: translate(-50%,-50%) rotate(-45deg);
}
`

export const CloseButton = () => {
    return <StyledSpan/>
}