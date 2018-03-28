package org.apache.cordova.urlgetplugin;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.json.JSONArray;
import org.json.JSONException;

/**
 * This class echoes a string called from JavaScript.
 */
public class CTCPlugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        //  if (action.equals("Urlget")) {

        String PreUrl =  args.getString(0);

        String Group = args.getString(2);

        String ZipCode = args.getString(3);

        String RetlName = null;
        String  Addr = null;

        try {
            RetlName=  URLEncoder.encode(  args.getString(1) , "Big5");
            Addr = URLEncoder.encode(args.getString(4), "Big5");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();

            callbackContext.error("url encoder error!!");
        }

        String GMCC = args.getString(5);

        String TCC = args.getString(6);

        int pageNum = Integer.parseInt(args.getString(7));

        String queriesNum = args.getString(8);

        try {
            if (pageNum == 1) {
                String url = PreUrl + "&WebMode=text&RetlName="
                        + RetlName + "&Group=" + Group
                        + "&ZipCode=" + ZipCode + "&Addr="
                        + Addr + "&GMCC=" + GMCC + "&TCC="
                        + TCC + "&RequestType=0";

                callbackContext.success(sendget(url));
            } else {
                String url = PreUrl + "&Request=NULL_NULL_"
                        + ( RetlName.isEmpty()  ? "NULL" : RetlName)
                        + "_" + (Group.isEmpty() ? "NULL" : Group)
                        + "_" + (ZipCode.isEmpty() ? "NULL" : ZipCode)
                        + "_" + (Addr.isEmpty() ? "NULL" : Addr)
                        + "_" + (GMCC.isEmpty() ? "NULL" : GMCC)
                        + "_" + (TCC.isEmpty() ? "NULL" : TCC)
                        + "_NULL_0_" + pageNum + "_20_" + queriesNum;

                callbackContext.success(sendget(url));

            }
        }
        catch (Exception e){
            e.printStackTrace();
            callbackContext.error("get url error!!");
            return false;
        }

        return true;
        // }
        // return false;
    }

    private String sendget(String url) throws Exception{

        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        // optional default is GET
        con.setRequestMethod("GET");

        BufferedReader in = new BufferedReader(
                new InputStreamReader( con.getInputStream(), "Big5") );
        String inputLine;

        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);

            response.append("\n");

            //System.out.println(inputLine);
        }
        in.close();

        //System.out.println( response.toString() );
        //print result
        return response.toString();
    }
}