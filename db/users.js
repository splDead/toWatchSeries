let records = [
    {
        id: 1,
        username: 'admin',
        password: 'admin',
        displayName: 'Admin',
        emails: [
            {
                value: 'admin@example.com'
            }
        ]
    },
    {
        id: 2,
        username: 'test1',
        password: 'test1',
        displayName: 'Test #1',
        emails: [
            {
                value: 'test1@example.com'
            }
        ]
    },
    {
        id: 3,
        username: 'test2',
        password: 'test2',
        displayName: 'Test #2',
        emails: [
            {
                value: 'test2@example.com'
            }
        ]
    }
];

exports.findById = (id, cb) => {
    process.nextTick(() => {
        let idx = id - 1;
        if (records[idx]) {
            cb(null, records[idx]);
        } else {
            cb(new Error(`User ${id} does not exist`));
        }
    });
};

exports.findByUsername = (username, cb) => {
    process.nextTick(() => {
        for (let i = 0; i < records.length; i++) {
            if (records[i].username === username) {
                return cb(null, records[i]);
            }
        }

        return cb(null, null);
    });
};
