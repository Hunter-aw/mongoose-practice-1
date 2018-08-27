const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/population-practice");
const Schema = mongoose.Schema;

// const commentSchema = new Schema({
//     text: String,
//     username: String,
//   })

// const postSchema = new Schema({
//     text: String,
//     username: String,
//     comments: [commentSchema]
//   })
// const Post = mongoose.model("Post", postSchema)

// const aPost = new Post({username: "Brandon", text: "my first post!!"});

// aPost.comments.push({ username: "Bob", text: "Great Post!" })

// aPost.save(function(err, data){console.log(data)})

// //to retrieve a comment that has a specific _id from aPost
// var aComment = aPost.comments.id(_id);

// //to remove a comment with a specific _id from aPost
// aPost.comments.id(_id).remove();

//----------------------------------------------------------------------//

// var authorSchema = new Schema({
//     name: String,
//     DOB: Date,
//     height: Number
//   });

const criticSchema = new Schema({
    name: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'review'
    }]
})
const Critic = mongoose.model('critic', criticSchema)

const bookSchema = new Schema({
    numberOfPages: Number,
    author: String,
    title: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'review'
    }]
});
const Book = mongoose.model('book', bookSchema);

const reviewSchema = new Schema({
    text: String,
    book: {
        type: Schema.Types.ObjectId,
        ref: 'book'
    },
    critic: {
        type: Schema.Types.ObjectId,
        ref: 'critic'
    }
})
const Review = mongoose.model('review', reviewSchema)


// Book.create({
//   numberOfPages: 22,
//   author: {
//     name: "Joe",
//     height: 156
//   }
// }, function(err, data) {
//   if (err) {
//     return console.error(err)
//   }
//   console.log(data)
// });


let critic1 = new Critic({
    name: "Hunter",
    reviews: []
});

let book1 = new Book({
    numberOfPages: 5000,
    author: "mufasa",
    title: "Yo mama",
    reviews: []
});

let review1 = new Review({
    text: "This book was like so totally good",
    book: book1,
    critic: critic1
})

// review1.save();

// book1.reviews.push(review1);
// critic1.reviews.push(review1)

// book1.save()
// critic1.save()

// Book.findOne({
//     title: "Yo mama"
// }).populate({
//     path: 'reviews',
//     populate: {
//         path: 'critic'
//     }
// }).exec((err, data) => {
//     console.log(data);
// });

// Critic.findOne({
//     name: "Hunter"
// }).populate({
//     path: 'reviews',
//     populate: {
//         path: 'book'
//     }
// }).exec((err, data) => {
//     if (err) {
//         console.log(err)
//     } else console.log(data)
// })

// Review.find({}).populate('critic book').exec((err, data) => {
//     console.log(data[0])
// })

// Critic.findOne({}).populate('reviews','text -_id').exec((err, critic) => {
//     console.log(critic.reviews) //comma adds the specific field
// }) //-field gets rid of the field


//Populating a document
// Critic.findOne({ name: "Hunter" }, function(err, critic) {
//     //now we have a single critic
//     critic.populate('reviews', function() {
//       console.log(critic.reviews);
//     });
//   });

Critic.find(function(err, critics) {
//now we have an array of critics
    Critic.populate(critics, { path: 'reviews' }, function(err, data) {
    //now data is an array of populated critics
        console.log(data[0]);
    });
});
  