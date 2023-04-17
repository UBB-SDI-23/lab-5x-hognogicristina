import ListCats from "./ListCats"
import FilterCats from "./FilterCats"
import AddCat from "./AddCat"
import DeleteCat from "./DeleteCat"
import UpdateCat from "./UpdateCat"
import { useState } from "react"

function Cats() {
    const [showList, setShowList] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const [showDeleteForm, setShowDeleteForm] = useState(false)
    const [showUpdateForm, setShowUpdateForm] = useState(false)

    const handleShowListClick = () => {
        setShowList(true)
        setShowFilter(false)
        setShowAddForm(false)
        setShowDeleteForm(false)
        setShowUpdateForm(false)
    }
    
    const handleShowFilterClick = () => {
        setShowFilter(true)
        setShowList(false)
        setShowAddForm(false)
        setShowDeleteForm(false)
        setShowUpdateForm(false)
    }

    const handleAddClick = () => {
        setShowAddForm(true)
        setShowList(false)
        setShowFilter(false)
        setShowDeleteForm(false)
        setShowUpdateForm(false)
    }
    
    const handleDeleteClick = () => {
        setShowDeleteForm(true)
        setShowList(false)
        setShowFilter(false)
        setShowAddForm(false)
        setShowUpdateForm(false)
    }
    
    const handleUpdateClick = () => {
        setShowUpdateForm(true)
        setShowList(false)
        setShowFilter(false)
        setShowAddForm(false)
        setShowDeleteForm(false)
    }    

    return (
        <div>
            <h1>Cats Section</h1>
            {showList ? (
                <>
                    <p>Here you can add, update, and delete cats.</p>
                    <ListCats />
                    <button className="cat-button" onClick={handleAddClick}>
                        <span className="button-text">Add a Cat</span>
                    </button>
                    <button className="cat-button" onClick={handleUpdateClick}>
                        <span className="button-text">Update a Cat</span>
                    </button>
                    <button className="cat-button" onClick={handleDeleteClick}>
                        <span className="button-text">Delete a Cat</span>
                    </button>
                    <button className="cat-button" onClick={() => setShowList(false)}>
                        <span className="button-text">Go Back</span>
                    </button>
                </>
            ) : showAddForm ? (
                <>
                    <AddCat />
                    <button className="cat-button" onClick={handleShowListClick}>
                        <span className="button-text">Go Back</span>
                    </button>
                </>
            ) : showUpdateForm ? (
                <>
                    <UpdateCat />
                    <button className="cat-button" onClick={handleShowListClick}>
                        <span className="button-text">Go Back</span>
                    </button>
                </>
            ) : showDeleteForm ? (
                <>
                    <DeleteCat />
                    <button className="cat-button" onClick={handleShowListClick}>
                        <span className="button-text">Go Back</span>
                    </button>
                </>
            ) : (
                <>
                    <button className="cat-button" onClick={handleShowListClick}>
                        <span className="button-text">Show the List of Cats</span>
                    </button>
                    <button className="cat-button" onClick={handleShowFilterClick}>
                        <span className="button-text">Filter Cats By Weight</span>
                    </button>
                </>
            )}
            {showFilter ? <FilterCats /> : null}
        </div>
    )
}

export default Cats
