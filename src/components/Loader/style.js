import styled from "styled-components";


export const LoaderWrapper = styled.div`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
background-color: #ffffff52;
z-index: 100;
/* HTML: */
/* HTML: <div class="loader"></div> */
.loader {
  width: 50px;
  --b: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #1773ff;
  -webkit-mask:
    repeating-conic-gradient(#0000 0deg,#000 1deg 70deg,#0000 71deg 90deg),
    radial-gradient(farthest-side,#0000 calc(100% - var(--b) - 1px),#000 calc(100% - var(--b)));
  -webkit-mask-composite: destination-in;
          mask-composite: intersect;
  animation: l5 1s infinite;
}
@keyframes l5 {to{transform: rotate(.5turn)}}
`;