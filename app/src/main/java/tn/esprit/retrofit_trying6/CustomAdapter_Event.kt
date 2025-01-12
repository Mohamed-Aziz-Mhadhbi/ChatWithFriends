import android.annotation.SuppressLint
import android.os.Build
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.EditText
import android.widget.Button
import androidx.annotation.RequiresApi
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
//import tn.esprit.retrofit_trying6.model.Event

import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import tn.esprit.retrofit_trying6.api.RetrofitInterface
import tn.esprit.retrofit_trying6.R
import tn.esprit.retrofit_trying6.model.Event
import java.util.HashMap

class CustomAdapter_Event(val events: ArrayList<Event>) : RecyclerView.Adapter<CustomAdapter_Event.EventViewHolder>() {
    private var retrofit: Retrofit? = null
    private var retrofitInterface: RetrofitInterface? = null
    private val BASE_URL = "http://10.0.2.2:3000"

    class EventViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        var eventName: TextView? = null
        var eventLocation: TextView? = null
        var eventImage: ImageView? = null
        var likeButton: ImageView? = null
        var dislikeButton: ImageView? = null
        var time: TextView? = null
        var editComment: EditText? = null
        var sendComment: Button? = null

        init {
            eventName = itemView.findViewById(R.id.eventName)
            eventLocation = itemView.findViewById(R.id.Location)
            eventImage = itemView.findViewById(R.id.img)
            likeButton = itemView.findViewById(R.id.jaime)
            dislikeButton = itemView.findViewById(R.id.dislike)
            time = itemView.findViewById(R.id.time)
            //editComment = itemView.findViewById(R.id.editcoment)
            //sendComment = itemView.findViewById(R.id.sendcomment)
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): EventViewHolder {
        val v = LayoutInflater.from(parent.context)
            .inflate(R.layout.activity_recycle_view_event, parent, false)
        return EventViewHolder(v)
    }

    @SuppressLint("ResourceAsColor")
    @RequiresApi(Build.VERSION_CODES.O)
    override fun onBindViewHolder(holder: EventViewHolder, position: Int) {
        val event = events[position]
        holder.eventName!!.text = event.event_name
        holder.eventLocation!!.text = event.event_location
        //holder.eventImage!!.setImageResource(R.drawable.your_image) // Replace with the appropriate image
        holder.time!!.text = event.event_description

        retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        retrofitInterface = retrofit!!.create(RetrofitInterface::class.java)

        holder.likeButton!!.setOnClickListener {
            holder.likeButton!!.setImageDrawable(ContextCompat.getDrawable(it.context, R.drawable.ic_blue_like))
            holder.dislikeButton!!.setImageDrawable(ContextCompat.getDrawable(it.context, R.drawable.ic_dislike))

            // Implement the logic to send a 'like' request to the server
        }

        holder.dislikeButton!!.setOnClickListener {
            holder.likeButton!!.setImageDrawable(ContextCompat.getDrawable(it.context, R.drawable.ic_like))
            holder.dislikeButton!!.setImageDrawable(ContextCompat.getDrawable(it.context, R.drawable.ic_blue_dislike))

            // Implement the logic to send a 'dislike' request to the server
        }

        holder.sendComment!!.setOnClickListener {
            val commentText = holder.editComment?.text.toString()
            if (commentText.isNotBlank()) {
                // Implement the logic to send a comment to the server
                // You can use 'commentText' to send the comment to the server
            }
        }
    }

    override fun getItemCount(): Int {
        return events.size
    }
}
