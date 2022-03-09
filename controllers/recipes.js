import { Recipe } from '../models/recipe.js'

function index(req, res) {
  Recipe.find({})
    .then(recipes => {
      res.render('recipes/index', {
        recipes,
        title: " Browse Recipes"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/recipes")
    })
}

function newRecipe(req, res) {
  res.render('recipes/new', {
    title: 'New Recipe'
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Recipe.create(req.body)
    .then(recipe => {
      res.redirect('/recipes')
    })
}

function show(req, res) {
  Recipe.findById(req.params.id)
    .exec(function (err, recipe) {
      res.render('recipes/show', {
        title: 'Recipe Details',
        recipe,
      })
    })
}

function createNote(req, res) {
  Recipe.findById(req.params.id)
    .exec(function (err, recipe) {
      recipe.notes.push(req.body)
      recipe.save(function (err) {
        res.redirect(`/recipes/${recipe._id}`)
      })
    })
}

function edit(req, res) {
  Recipe.findById(req.params.id)
    .exec(function (err, recipe) {
      res.render('recipes/edit', {
        recipe,
        err,
        title: "Edit Recipe"
      })
    })
}

function update(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Recipe.findByIdAndUpdate(req.params.id, req.body, function (err, recipe) {
    res.redirect(`/recipes/${recipe._id}/edit`)
  })
}

function deleteRecipe(req, res) {
  Recipe.findByIdAndDelete(req.params.id, function (err, recipe) {
    res.redirect('/profile')
  })
}

function deleteNote(req, res) {
  Recipe.findById(req.params.recipeId)
    .then(recipe => {
      recipe.notes.remove({ _id: req.params.noteId })
      recipe.save()
        .then(() => {
          res.redirect(`/recipes/${recipe._id}/edit`)
        })
    })
}

function updateNote(req, res) {
  Recipe.findById(req.params.recipeId)
    .then(recipe => {
      recipe.notes.forEach(note => {
        if (note._id == (req.params.noteId)) {
          note.content = (req.body.content)
          recipe.save()
          .then(() => {
            res.redirect(`/recipes/${recipe._id}/edit`)
          })

        }
      })
    })
  }



export {
  index,
  newRecipe as new,
  create,
  show,
  createNote,
  edit,
  update,
  deleteRecipe as delete,
  deleteNote,
  updateNote
}