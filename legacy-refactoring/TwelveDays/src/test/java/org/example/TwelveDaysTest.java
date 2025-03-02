package org.example;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class TwelveDaysTest {
    @Test
    public void testHandlesAllTheDays() {
        TwelveDays twelveDays = new TwelveDays(1);
        String result = twelveDays.print().toString();
        String expectedOutput = "On the first day of Christmas\n" +
                "My true love sent to me;\n" +
                "A partridge in a pear tree.\n\n";
        assertEquals(expectedOutput, result);
    }

    @Test
    // read again later: https://stackoverflow.com/questions/1119385/junit-test-for-system-out-println
    public void testHandlesOutOfRangeNumbers() {};

}
