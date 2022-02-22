import styled, { css } from "styled-components";

export const AccountList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

export const AccountLabel = styled.div`
  font-size: ${(props) => props.theme.typography.xl.fontSize};
  line-height: ${(props) => props.theme.typography.xl.lineHeight};
  color: ${(props) => props.theme.colors.neutral[900]};
  margin-bottom: ${(props) => props.theme.space.s};
`;

export const AccountHeadline = styled.h2`
  font-size: ${(props) => props.theme.typography["3xl"].fontSize};
  line-height: ${(props) => props.theme.typography["3xl"].lineHeight};
  font-weight: normal;
  color: ${(props) => props.theme.colors.neutral[900]};
  margin-bottom: ${(props) => props.theme.space.m};
`;

export const InfoText = styled.div`
  line-height: 1.6;
  font-size: ${(props) => props.theme.typography.m.fontSize};
  color: ${(props) => props.theme.colors.neutral[600]};
`;

export const AccountSection = styled.div`
  padding: ${(props) => props.theme.space.m} 0;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${(props) => props.theme.colors.neutral[200]};
  }
}
`;

export const AccountListItem = styled.div`
  display: flex;

  &:not(:last-of-type) {
    margin-bottom: ${(props) => props.theme.space.m};
  }
`;

export const Inset = styled.div`
  padding: 0 ${(props) => props.theme.space.m};
`;

export const ChangesContainer = styled.div`
width: 500px;
  margin-top: ${(props) => props.theme.space.m};
  border: 1px solid ${(props) => props.theme.colors.neutral[200]};
  padding: 25px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);

 
`

 export const ChangesItems = styled.div`
 
 `

export const Changes = styled.div`  
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
 
`

export const ChangesInfo = styled.div`
text-align: center;
  color: #006b57;
  font-weight: 600;
  font-size: 14px;
  width: 175px;
  padding: 5px;
  background-color: #c2f7e1;
  border-radius: 14px;
`
