import { useEffect, useState } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";

// 1. 앱이 실행되자마자 현재위치 기반의 날씨가 보인다.
// 2. 날씨정보에는 도시 섭씨 화씨 날씨 상태
// 3. 5개의 버튼이 있다.(1개는 현재위치, 4개는 다른도시)
// 4. 도시버튼을 클릭하때 마다 도시별 날씨가 나온다.
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.
// api. 7158715b5473263e43fe77ba8447ce89
// 현재위치를 가지고 api를 통해 날씨 호출
function App() {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const cities = ['paris', 'new york', 'tokyo', 'seoul'];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    })
  }

  const getWeatherByCurrentLocation = async (lat, lon) => {     // await를 사용하려면 async를 꼭 사용해줘야함. async는 비동기적 처리
    const key = "7158715b5473263e43fe77ba8447ce89";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    let response = await fetch(url);    // url 을 호출해서 데이터를 가져오는것을 기다려서 response하는것을
    let data = await response.json();      // api는 대부분 json파일로 구성되어 이 json 파일을 추출해야 볼 수 있다.
    setWeather(data);
  }

  useEffect(() => {
    getCurrentLocation()
  }, []);

  useEffect(() => {
    console.log("city?", city);
  }, [city])
  return (
    <div>
      <div className="container">
        <WeatherBox weather={weather} />
        <WeatherButton cities={cities} setCity={setCity} />
      </div>
    </div>
  );
}

export default App;
