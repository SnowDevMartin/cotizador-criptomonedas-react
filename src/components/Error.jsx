import styled from "@emotion/styled"

const MensajeError = styled.p`
    background-color: #b7322c;
    padding: 1rem;
    color: #fff;
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
    font-family: 'Bebas Neue', cursive;
`

const Error = ({children}) => {
  return (
    <MensajeError>
      {children}
    </MensajeError>
  )
}

export default Error
