package tn.esprit.retrofit_trying6.view.Fragments

import CustomAdapter_Event
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import tn.esprit.retrofit_trying6.R
import tn.esprit.retrofit_trying6.api.RetrofitInterface
//import tn.esprit.retrofit_trying6.model.Acceuil
import tn.esprit.retrofit_trying6.model.Event


class FirstFragment : Fragment() {

    private var layoutManager: RecyclerView.LayoutManager? = null
    private var adapter:RecyclerView.Adapter<CustomAdapter_Event.EventViewHolder>? = null

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_first, container, false)
    }







    override fun onViewCreated(itemView: View, savedInstanceState: Bundle?) {
       // override fun onViewCreated(itemView: View, savedInstanceState: Bundle?) {
            super.onViewCreated(itemView, savedInstanceState)

            val recyclerView = itemView.findViewById<RecyclerView>(R.id.recyclerView) // Replace with the ID of your RecyclerView in your XML layout

            val retrofit = Retrofit.Builder()
                .baseUrl("http://10.0.2.2:3000") // Replace with your Node.js server URL
                .addConverterFactory(GsonConverterFactory.create())
                .build()

            val retrofitInterface = retrofit.create(RetrofitInterface::class.java)

            val call = retrofitInterface.getAllEvents()
            call.enqueue(object : Callback<List<Event>> {
                override fun onResponse(call: Call<List<Event>>, response: Response<List<Event>>) {
                    if (response.isSuccessful) {
                        val events = response.body() ?: emptyList() // Ensure events is never null
                        val eventsArrayList = ArrayList(events) // Convert List to ArrayList

                        // Create an instance of CustomAdapter_Event with the ArrayList
                        adapter = CustomAdapter_Event(eventsArrayList)

                        // Set the adapter to your RecyclerView
                        recyclerView.adapter = adapter
                    } else {
                        // Handle the response error
                    }


            }

                override fun onFailure(call: Call<List<Event>>, t: Throwable) {
                    // Handle the network or request failure
                }
            })

            // Set the layout manager for the RecyclerView
            layoutManager = LinearLayoutManager(activity)
            recyclerView.layoutManager = layoutManager
        }
}
