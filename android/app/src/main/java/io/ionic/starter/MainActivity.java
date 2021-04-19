package io.ionic.starter;

import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.google.firebase.iid.FirebaseInstanceId;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
    }});

    try {
      String token = FirebaseInstanceId.getInstance().getToken();
      Log.d("IDService","device token : " + token);

      NetworkTask.NetworkTask2 networkTask = new NetworkTask.NetworkTask2();

      Map<String, String> params = new HashMap<String, String>();
      params.put("deviceIdToken", token);

      networkTask.execute(params);

    } catch (NullPointerException e) {
      e.printStackTrace();
    }

  }


}
