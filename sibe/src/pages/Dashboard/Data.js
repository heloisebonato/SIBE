// import axios from 'axios';
// import React, { useEffect, useState, useRef } from 'react';


// const UserData = () => {

//     const [countCarretasLoc, setcountCarretasLoc] = useState([]);

//     let labels = [];
//     let value = [];
//     const UserDataT = [];

//     useEffect(() => {
//         console.log(123123);
//         axios.get(`/countCarretasLoc`)
//           .then(data => {
//             return data.json();
//           })
//           .then(data => {
//             setcountCarretasLoc(data);
//             //const UserDataT = [];

//             countCarretasLoc.forEach(element => {
//                 labels.push(element.placa_carreta);
//                 value.push(parseInt(element.contagem_loc));

//                 const chartDataValue = [
//                     {
//                         label: element.placa_carreta,
//                         value: element.contagem_loc
//                     }];
                
//                     UserDataT.push(chartDataValue)


//                     });
                
//                 //setuserDataState(UserDataT)
//                 console.log(UserDataT)
//                 return UserDataT;
//           })
//           .catch(err => {
//             console.log(123123);
//           });
//       }, []);
// //     const [countCarretasLoc, setcountCarretasLoc] = useState([]);

// //     //var chartData  = [];

//     // useEffect(() => {
//     //     axios.get(`/countCarretasLoc`)
//     //       .then(data => {
//     //         return data.json();
//     //       })
//     //       .then(data => {
//     //         setcountCarretasLoc(data);
//     //       })
//     //       .catch(err => {
//     //         console.log(123123);
//     //       });
//     //   }, []);

// //     // var data = axios.get(`/countCarretasLoc`);
// //     // setcountCarretasLoc(data.data[0]);                 

// //     const UserDataT = [];

// //     let labels = [];
// //     let value = [];
// //     countCarretasLoc.forEach(element => {
// //         labels.push(element.placa_carreta);
// //         value.push(parseInt(element.contagem_loc));

// //         const chartDataValue = [
// //             {
// //                 label: element.placa_carreta,
// //                 value: element.contagem_loc
// //             }];
        
// //             UserDataT.push(chartDataValue)


// //             });
        
// //         console.log(UserDataT)
// //         return UserDataT;
// // }

// // console.log(UserData2())
// console.log(UserDataT);
// return countCarretasLoc;

// }

export const UserData = [
    {
      id: 1,
      year: "AA34D42",
      userGain: 80000,
      userLost: 823,
    },
    {
      id: 2,
      year: "AAA888",
      userGain: 45677,
      userLost: 345,
    },
    {
      id: 3,
      year: "2018",
      userGain: 78888,
      userLost: 555,
    },
    {
      id: 4,
      year: "2019",
      userGain: 90000,
      userLost: 4555,
    },
    // {
    //   id: 5,
    //   year: "2020",
    //   userGain: 4300,
    //   userLost: 234,
    // },
  ];

  export default UserData;