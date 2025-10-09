// //tp display
// function displayPhotos() {
//   $.ajax({
//     url: "https://jsonplaceholder.typicode.com/photos",
//     method: "GET",
//     dataType: "json",
//     success: handleResponse,
//     error: function (error) {
//       console.error("error fetching the photos", error);
//     },
//   });
// }

// function handleResponse(photo) {
//   const photosList = $("#photosList");

//   $.each(photos.slice(0, 10), function (index, photo) {
//     photosList.append(
//       `<div class="mb-3">
//         <h3>${photo.albumId}</h3>
//         <h3>${photo.title}</h3>
//         <div><img src="${photo.url}" alt="${photo.id}"/></div>
//         <div><img src="${photo.thumbnailUrl}" alt="${photo.id}"/></div>
//         <div>
//             <button class="btn btn-info btn-sm mr-2 btn-edit" data-id="${photo.id}">Edit</button>
//             <button class="btn btn-danger btn-sm mr-2 btn-del" data-id="${photo.id}">Delete</button>
//         </div>
//     </div>
//     <hr />`
//     );
//   });
// }

function displayPhotos() {
  $.ajax({
    url: "https://picsum.photos/v2/list?page=1&limit=10", // <--- changed URL
    method: "GET",
    dataType: "json",
    success: handleResponse,
    error: function (error) {
      console.error("error fetching the photos", error);
    },
  });
}

function handleResponse(photos) {
  const photosList = $("#photosList");
  photosList.empty();

  $.each(photos, function (index, photo) {
    photosList.append(
      `<div class="mb-3">
          <h3>${photo.author}</h3>
          <div><img src="${photo.download_url}" alt="${photo.id}" width="200"/></div>
       </div><hr/>`
    );
  });
}

//when page loads
$(document).ready(function () {
  displayPhotos();
});
