import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { getReservationsAction } from "../../store/actions/reservationsActions";
import { getCarsAction } from "../../store/actions/carsActions";
import { getUsersAction } from "../../store/actions/usersActions";
import { getCarsModelsAction } from "../../store/actions/carsModelsActions";
import HomeCardInfo from "../../components/home-card-info/HomeCardInfo";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState([]);
  const [carsData, setCarsData] = useState([]);
  const [reservationsData, setReservationsData] = useState([]);

  const { users } = useSelector((state) => state.users);
  const { cars } = useSelector((state) => state.cars);
  const { reservations } = useSelector((state) => state.reservations);

  useEffect(() => {
    dispatch(getCarsModelsAction());
    dispatch(getReservationsAction());
    dispatch(getCarsAction());
    dispatch(getUsersAction());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0) {
      setUsersData(users);
    }
  }, [users]);

  useEffect(() => {
    if (cars.length > 0) {
      setCarsData(cars);
    }
  }, [cars]);

  useEffect(() => {
    if (reservations.length > 0) {
      setReservationsData(reservations);
    }
  }, [reservations]);

  return (
    <div className="container-2">
      <Navbar />
      {usersData.length > 0 && (
        <HomeCardInfo title="Users" count={usersData.length} />
      )}
      {carsData.length > 0 && (
        <HomeCardInfo
          title="Cars"
          count={carsData.length}
          onClick={() => navigate("/cars")}
        />
      )}
      {reservationsData.length > 0 && (
        <HomeCardInfo
          title="Reservations"
          count={reservationsData.length}
          onClick={() => navigate("/reservations")}
        />
      )}
    </div>
  );
}

export default HomePage;
