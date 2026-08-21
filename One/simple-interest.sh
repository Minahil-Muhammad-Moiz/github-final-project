
---

# Task 5: simple-interest.sh

```bash
#!/bin/bash

# Simple Interest Calculator
# This script calculates simple interest based on user input

# Function to display usage
usage() {
    echo "Usage: $0 [principal] [rate] [time]"
    echo "  principal: Initial amount (positive number)"
    echo "  rate:      Annual interest rate in percentage (positive number)"
    echo "  time:      Time period in years (positive number)"
    echo ""
    echo "Example: $0 1000 5 3"
    echo "  This calculates interest for $1000 at 5% for 3 years"
    exit 1
}

# Function to calculate simple interest
calculate_interest() {
    local principal=$1
    local rate=$2
    local time=$3
    
    # Formula: Simple Interest = (Principal * Rate * Time) / 100
    echo "scale=2; ($principal * $rate * $time) / 100" | bc
}

# Function to calculate total amount
calculate_total() {
    local principal=$1
    local interest=$2
    echo "scale=2; $principal + $interest" | bc
}

# Main script execution
main() {
    # Check if bc is installed
    if ! command -v bc &> /dev/null; then
        echo "Error: 'bc' command not found. Please install bc."
        echo "On Ubuntu/Debian: sudo apt-get install bc"
        echo "On macOS: brew install bc"
        exit 1
    fi

    local principal rate time

    # Check if arguments are provided
    if [ $# -eq 3 ]; then
        # Use command line arguments
        principal=$1
        rate=$2
        time=$3
    else
        # Interactive mode - prompt for input
        echo "=== Simple Interest Calculator ==="
        echo ""
        
        # Get principal amount
        while true; do
            read -p "Enter principal amount: " principal
            if [[ $principal =~ ^[0-9]+([.][0-9]+)?$ ]] && [ $(echo "$principal > 0" | bc) -eq 1 ]; then
                break
            else
                echo "Invalid input. Please enter a positive number."
            fi
        done
        
        # Get rate of interest
        while true; do
            read -p "Enter annual interest rate (%): " rate
            if [[ $rate =~ ^[0-9]+([.][0-9]+)?$ ]] && [ $(echo "$rate > 0" | bc) -eq 1 ]; then
                break
            else
                echo "Invalid input. Please enter a positive number."
            fi
        done
        
        # Get time period
        while true; do
            read -p "Enter time period (years): " time
            if [[ $time =~ ^[0-9]+([.][0-9]+)?$ ]] && [ $(echo "$time > 0" | bc) -eq 1 ]; then
                break
            else
                echo "Invalid input. Please enter a positive number."
            fi
        done
    fi

    # Validate inputs
    if [ -z "$principal" ] || [ -z "$rate" ] || [ -z "$time" ]; then
        echo "Error: All inputs are required."
        usage
    fi

    if ! [[ $principal =~ ^[0-9]+([.][0-9]+)?$ ]] || ! [[ $rate =~ ^[0-9]+([.][0-9]+)?$ ]] || ! [[ $time =~ ^[0-9]+([.][0-9]+)?$ ]]; then
        echo "Error: All inputs must be valid numbers."
        usage
    fi

    # Calculate interest
    interest=$(calculate_interest "$principal" "$rate" "$time")
    
    # Calculate total amount
    total=$(calculate_total "$principal" "$interest")

    # Display results
    echo ""
    echo "========================================="
    echo "        Simple Interest Calculation"
    echo "========================================="
    printf "Principal Amount: %-15s $%10.2f\n" "" "$principal"
    printf "Rate of Interest: %-15s %10.2f%%\n" "" "$rate"
    printf "Time Period:      %-15s %10.2f years\n" "" "$time"
    echo "-----------------------------------------"
    printf "Simple Interest:  %-15s $%10.2f\n" "" "$interest"
    printf "Total Amount:     %-15s $%10.2f\n" "" "$total"
    echo "========================================="
    echo ""
}

# Run the script with command line arguments or interactive mode
if [ $# -eq 3 ] || [ $# -eq 0 ]; then
    main "$@"
else
    echo "Error: Invalid number of arguments"
    usage
fi
