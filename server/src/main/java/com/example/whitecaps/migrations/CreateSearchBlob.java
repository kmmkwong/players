package com.example.whitecaps.migrations;

import liquibase.change.custom.CustomTaskChange;
import liquibase.database.Database;
import liquibase.database.jvm.JdbcConnection;
import liquibase.exception.CustomChangeException;
import liquibase.exception.SetupException;
import liquibase.exception.ValidationErrors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import liquibase.resource.ResourceAccessor;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.sql.Statement;
import com.example.whitecaps.core.Player;


// this class is used in db migration to generate a search blob so 
// later on we do not need to search all columns one by one.
public class CreateSearchBlob implements CustomTaskChange {

    //to hold the parameter value
    private String file;


    private ResourceAccessor resourceAccessor;


    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(CreateSearchBlob.class);

    @Override
    public void execute(Database database) throws CustomChangeException {
        JdbcConnection databaseConnection = null;
        Statement statement = null;

        try {
            databaseConnection = (JdbcConnection) database.getConnection();
            statement = databaseConnection.createStatement();


            //Opening my data file
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(resourceAccessor.getResourcesAsStream(file).iterator().next()));

            //Ignore header
            String str = in.readLine();

            while ((str = in.readLine()) != null && !str.trim().equals("")) {

                // tokenize using delimitor ignoring those in quotes
                LOGGER.info("Processing line "+ str);
                String[] tokens = str.split(Player.delimiter + "(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1); 
                String blob = new String();
                long id = -1;
                for (String token : tokens) {

                    // remove whitespace and quotes at front and back
                    String processedToken = token.trim().replaceAll("^\"|\"$", "");

                    // escape the delimiter to make sure the search is accurate
                    processedToken = Player.escape(processedToken); 
                    if (id == -1) {
                        id = Long.parseLong(processedToken, 10);
                    }
                    blob += processedToken;
                    blob += ",";
                }

                // Update search blob
                String sql = "UPDATE players SET searchblob = '" + blob +"' WHERE number = " + id;
                int resultInt = statement.executeUpdate(sql);
                LOGGER.info("Query: " + sql + ", result: "+ resultInt);
            }
            in.close();

            
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomChangeException(e);
         }//end try
    }

    @Override
    public String getConfirmationMessage() {
        return null;
    }

    @Override
    public void setUp() throws SetupException {

    }

    @Override
    public void setFileOpener(ResourceAccessor resourceAccessor) {
        this.resourceAccessor = resourceAccessor;
    }

    @Override
    public ValidationErrors validate(Database database) {
        return null;
    }

}