package tn.esprit.retrofit_trying6.model

data class Event (
    val id: String, // You may need to use the actual data type for your event ID
    val event_name: String,
    val event_date: String,
    val event_location: String,
    val event_description: String)