#!/bin/bash

# Configuration
# Format: "directory:env_files"
# env_files: comma-separated list of env files to combine (without the leading dot)
declare -A CONFIG=(
    ["apps/api"]=".env,.database.env,.auth.env"
    ["apps/app"]=".env,.database.env,.auth.env,.urls.env"
    ["apps/web"]=".env,.urls.env"
    ["apps/studio"]=".database.env"
    ["packages/database"]=".database.env"
)

# Function to combine env files based on configuration
combine_env_files() {
    target_dir=$1
    env_files=$2
    
    # Clear existing .env file
    > "$target_dir/.env"
    
    # Convert comma-separated string to array
    IFS=',' read -ra FILES <<< "$env_files"
    
    # Combine files
    for file in "${FILES[@]}"; do
        if [ -f $file ]; then
            echo "# From $file" >> "$target_dir/.env"  # Add newline between files
            cat $file >> "$target_dir/.env"
            echo "" >> "$target_dir/.env"  # Add newline between files
        else
            echo "Warning: $file not found"
        fi
    done
    
    echo "Created $target_dir/.env"
}

# Process each configured directory
for dir in "${!CONFIG[@]}"; do
    # Create directory if it doesn't exist
    mkdir -p "$dir"
    combine_env_files "$dir" "${CONFIG[$dir]}"
done