import { useStateContext } from "../Context";

const BackgroundLayout = () => {
  const { weather } = useStateContext();

  console.log(weather);
  
  return (
    <div>
       Background Layout
    </div>
  );
}

export default BackgroundLayout;
