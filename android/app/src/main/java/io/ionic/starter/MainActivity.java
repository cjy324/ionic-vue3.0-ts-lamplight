package io.ionic.starter;

import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.google.android.gms.tasks.Task;
import com.google.firebase.iid.FirebaseInstanceId;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends BridgeActivity {

  private TextView tvTitle;
  private TextView tvMemo;

  @Override
  public void onCreate(Bundle savedInstanceState) {

    super.onCreate(savedInstanceState);

    setContentView(R.layout.activity_main);

    tvTitle = (TextView) findViewById(R.id.tvTitle);
    tvMemo = (TextView) findViewById(R.id.tvMemo);

    NetworkTask2 networkTask = new NetworkTask2();

    Map<String, String> params = new HashMap<String, String>();
    params.put("title", "메모입니다.");
    params.put("memo", "메모를 입력했습니다.");

    networkTask.execute(params);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
    }});

    try {
      String token = FirebaseInstanceId.getInstance().getToken();
      Log.d("IDService","device token : "+token);
    } catch (NullPointerException e) {
      e.printStackTrace();
    }
  }

  public static class NetworkTask2 extends AsyncTask<Map<String, String>, Integer, String> {
    @Override
    protected String doInBackground(Map<String, String>... maps) { // 내가 전송하고 싶은 파라미터

// Http 요청 준비 작업
      HttpClient.Builder http = new HttpClient.Builder("POST", "http://192.168.0.20:8021/adr/push/receiveDeviceId");

// Parameter 를 전송한다.
      http.addAllParameters(maps[0]);


//Http 요청 전송
      HttpClient post = http.create();
      post.request();

// 응답 상태코드 가져오기
      int statusCode = post.getHttpStatusCode();

// 응답 본문 가져오기
      String body = post.getBody();

      return body;
    }

    @Override
    protected void onPostExecute(String s) {
      Log.d("JSON_RESULT", s);

    }
  }

}
