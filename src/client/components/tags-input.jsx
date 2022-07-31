import React, { useState } from "react";
import PropTypes from "prop-types";

const TagsInput = ({ tags, onChange }) => {

    const [newTag, setNewTag] = useState('');

    const handleNewTagChange = (event) => {
        setNewTag(event.target.value);
    }

    const handleKeyUp = (event) => {
        const trimmedNewTag = newTag.trim();
        if (event.key === "Enter" && !tags.includes(trimmedNewTag)) {
            event.preventDefault();
            setNewTag('');
            onChange([...tags, trimmedNewTag]);
        }
    }

    const deleteTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        onChange(newTags);
    }

    return (<div className="tags-container">
        {tags.map((tag, index) => (
            <div className="tag-pill" key={tag}>
                {tag}
                <input
                    type="button"
                    className="tag-remove-button"
                    value="x"
                    onClick={() => deleteTag(index)} />
            </div>))}
        <input
            className="tag-input"
            placeholder="Add a tag"
            value={newTag}
            onChange={handleNewTagChange}
            onKeyUp={handleKeyUp} />
    </div>);
};

TagsInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TagsInput;